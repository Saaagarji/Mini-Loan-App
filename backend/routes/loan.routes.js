import express from "express";
import {
  createLoan,
  getLoanById,
  getUserLoan,
  updateLoan,
  deleteLoan,
  approveLoan,
  addRepayment,
  rejectLoan,
} from "../controllers/loan.controller.js";
const router = express.Router();

router.post('/', createLoan);
router.get("/:loanId", getLoanById);
router.get("/user/:loanId", getUserLoan);
router.put('/:loanId', updateLoan);
router.delete('/:loanId', deleteLoan);

router.post(
  "/:loanId/approve",
  approveLoan
);

router.post("/:loanId/reject", rejectLoan);

router.post("/:loanId/repayment", addRepayment);

export default router;
