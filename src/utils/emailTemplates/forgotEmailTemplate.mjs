const forgotPasswordMailerBody = (user, otp) => {
  return {
    to: user?.email,
    from: "saeedgulkhan1993@gmail.com",
    subject: "Send Otp Verification",
    text: "For Set Your Password",
    html: `<b>${user?.username}</b> is otp ${otp}`,
  };
};

export { forgotPasswordMailerBody };
