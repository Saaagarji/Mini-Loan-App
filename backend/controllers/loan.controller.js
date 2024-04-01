import Loan from "../models/loan.model.js";

export const createLoan = async (req, res) => {
  try {
    const {
      amount,
      term,
      repaymentAmount,
      user,
      repaymentFrequency,
      repaymentSchedule,
    } = req.body;

    const newLoan = new Loan({
      user,
      amount,
      term,
      repaymentAmount,
      repaymentFrequency: repaymentFrequency || "weekly",
      repaymentSchedule: repaymentSchedule,
      status: "PENDING",
    });

    await newLoan.save();

    res
      .status(201)
      .json({ message: "Loan application submitted successfully" });
  } catch (error) {
    console.error("Error creating loan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find().populate("user", "email");
    res.status(200).json(loans);
  } catch (error) {
    console.error("Error fetching loans:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserLoan = async (req, res) => {
  try {
    const { userId } = req.params;
    const loans = await Loan.find({ loan: userId }).populate("user", "email");

    if (!loans || loans.length === 0) {
      return res.status(404).json({ error: "No loans found for the user" });
    }

    res.status(200).json(loans);
  } catch (error) {
    console.error("Error fetching loans:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateLoan = async (req, res) => {
  try {
    const { loanId } = req.params;
    const updateData = req.body;

    const updatedLoan = await Loan.findByIdAndUpdate(loanId, updateData, {
      new: true,
    });

    if (!updatedLoan) {
      return res.status(404).json({ error: "Loan not found" });
    }

    res
      .status(200)
      .json({ message: "Loan updated successfully", loan: updatedLoan });
  } catch (error) {
    console.error("Error updating loan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteLoan = async (req, res) => {
  try {
    const { loanId } = req.params;

    const deletedLoan = await Loan.findByIdAndDelete(loanId);

    if (!deletedLoan) {
      return res.status(404).json({ error: "Loan not found" });
    }

    res.status(200).json({ message: "Loan deleted successfully" });
  } catch (error) {
    console.error("Error deleting loan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const payRepayment = async (req, res) => {
  try {
    const { loanId } = req.params;
    const { scheduleId } = req.body; // Assuming you pass the scheduleId in the request body

    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }

    const scheduleIndex = loan.repaymentSchedule.findIndex(
      (schedule) => schedule._id.toString() === scheduleId
    );

    if (scheduleIndex === -1) {
      return res.status(404).json({ error: "Repayment schedule not found" });
    }

    loan.repaymentSchedule[scheduleIndex].status = "PAID";
    await loan.save();

    res.status(200).json({
      message: "Repayment Successfully",
      status: loan.repaymentSchedule[scheduleIndex].status,
    });
  } catch (error) {
    console.error("Error in Repayment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const approveLoan = async (req, res) => {
  try {
    const { loanId } = req.params;
    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }

    loan.status = "APPROVED";
    loan.approvedByAdmin = true;
    await loan.save();
    res.status(200).json({
      message: "Loan approved by admin successfully",
      status: loan.status,
    });
  } catch (error) {
    console.error("Error approving loan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const rejectLoan = async (req, res) => {
  try {
    const { loanId } = req.params;
    const loan = await Loan.findById(loanId);

    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }

    loan.status = "REJECTED";
    loan.approvedByAdmin = false;
    await loan.save();

    res.status(200).json({
      message: "Loan rejected by admin successfully",
      status: loan.status,
    });
  } catch (error) {
    console.error("Error rejecting loan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addRepayment = async (req, res) => {
  try {
    const { loanId } = req.params;
    const { amount, date } = req.body;

    if (!amount || !date) {
      return res.status(400).json({ error: "Amount and date are required" });
    }

    const loan = await Loan.findById(loanId);
    const extraAmount = amount - nextRepayment;
        const newRepaymentAmount = nextRepayment.amount - extraAmount;
        nextRepayment.amount = newRepaymentAmount;

    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }

    if (loan.status !== "APPROVED") {
      return res.status(400).json({ error: "Loan is not approved yet" });
    }

    const nextRepayment = loan.repaymentSchedule.find(
      (repayment) => repayment.status === "PENDING"
    );

    if (!nextRepayment) {
      return res.status(400).json({ error: "No pending repayments found" });
    }

    if (amount < nextRepayment.amount) {
      return res
        .status(400)
        .json({ error: "Repayment amount is less than the pending amount" });
    }

    nextRepayment.status = "PAID";
    nextRepayment.datePaid = new Date();
    loan.status = "PAID";

    const newRepayment = new Loan({
      loan: loanId,
      amount,
      date,
      status: "PAID",
    });

    loan.repaymentSchedule.push(newRepayment);

    await loan.save();
    await newRepayment.save();

    res.status(201).json({
      message: "Repayment added successfully",
      repayment: newRepayment,
    });
  } catch (error) {
    console.error("Error adding repayment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
