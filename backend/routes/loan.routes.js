import express from "express";
import {
  createLoan,
  getUserLoan,
  updateLoan,
  deleteLoan,
  approveLoan,
  rejectLoan,
} from "../controllers/loan.controller.js";
const router = express.Router();

router.post('/', createLoan);
router.get("/user/:loanId", getUserLoan);
router.put('/:loanId', updateLoan);
router.delete('/:loanId', deleteLoan);

router.post(
  "/:loanId/approve",
  approveLoan
);

router.post("/:loanId/reject", rejectLoan);


export default router;
