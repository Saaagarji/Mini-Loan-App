import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    approvedByAdmin: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: `Number`,
      required: true,
    },
    term: {
      type: Number,
      required: true,
    },
    repaymentAmount: {
      type: Number,
      required: true,
    },
    repaymentFrequency: {
      type: String,
      enum: ["weekly", "monthly"],
      default: "weekly",
    },
    repaymentSchedule: [
      {
        date: {
          type: Date,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          enum: ["PENDING", "PAID"],
          default: "PENDING",
        },
      },
    ],
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED", "PAID"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

const Loan = mongoose.model("Loan", loanSchema);

export default Loan;
