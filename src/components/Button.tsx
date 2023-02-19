import React from 'react'
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: 18,
  textTransform: "unset",
  fontSize: "0.7rem"
}))

export default CustomButton