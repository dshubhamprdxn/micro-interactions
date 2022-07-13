const errorMessages = ["Email", "Enter Email!", "Email format invalid"];

const mainContainer = $(".main-container");
const form = mainContainer.find("form");
const emailDiv = mainContainer.find(".email-div");

const emailIDInput = emailDiv.find("#email-id");
const emailMessage = emailDiv.find(".email-message");
const emailCorrectResponse = emailDiv.find(".email-interactive-response.correct");
const emailIncorrectResponse = emailDiv.find(".email-interactive-response.incorrect");