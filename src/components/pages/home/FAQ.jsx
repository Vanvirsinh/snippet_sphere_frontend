import React from "react";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid #303030`,
  background: "#232323",
  borderRadius: "5px",
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    {...props}
    expandIcon={<AddIcon sx={{ fontSize: 20, color: "#ffc0cb" }} />}
  />
))(({ theme }) => ({
  backgroundColor: "#232323",
  borderRadius: "5px",
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(45deg)",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  background: "#1c1c1c",
  borderRadius: "5px",
}));

const questions = [
  {
    question: "Is your code snippet manager free to use?",
    answer:
      "Yes, our code snippet manager is completely free with no charges or limitations.",
  },
  {
    question: "Can I organize my snippets into folders or categories?",
    answer:
      "Absolutely! You can easily create folders to organize your snippets based on language, project, or any custom category.",
  },
  {
    question: "Can users gain followers and showcase their profile?",
    answer:
      "Absolutely! Users can gain followers within the platform, allowing them to showcase their profile and snippets to a wider audience.",
  },
  {
    question:
      "Are there any restrictions on the number of snippets I can store?",
    answer:
      "No, at this moment there are no limitations. You can store an unlimited number of snippets.",
  },
  {
    question: "Can I share my code snippets with others?",
    answer:
      "Yes, you can share snippets by creating them publicly, making collaboration seamless.",
  },
  {
    question: "Is there a search feature to find specific snippets?",
    answer:
      "Absolutely! Our platform offers an advanced search function to quickly locate your desired code snippets.",
  },
  {
    question: "Can I access my snippets on different devices?",
    answer:
      "Yes, our platform supports cross-platform synchronization for easy access on various devices.",
  },
  {
    question: "How secure are my private snippets?",
    answer:
      "We prioritize security. Private snippets are securely stored and accessible only to you.",
  },
  {
    question: "Is there a version history for edited snippets?",
    answer:
      "No, at this moment we're not offering this feature. But very soon we'll going include this option as well.",
  },
  {
    question: "Can I contribute to open-source using this platform?",
    answer:
      "Absolutely! Contribute by sharing solutions via public snippets and supporting the open-source community.",
  },
];

function FAQ() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <div>
        <div>
          <div className="bg-primary px-10 py-14">
            <div className="flex gap-x-10">
              <div className="w-1/3">
                <div className="text-white flex flex-col gap-y-5">
                  <h1 className="text-5xl mb-5 font-semibold">FAQs</h1>
                  <p className="text-xl text-white/[0.8]">
                    Providing answers to commonly asked questions. Please feel
                    free to explore! 🤔
                  </p>
                </div>
              </div>
              <div className="w-2/3">
                <div>
                  {questions.map((question, index) => {
                    return (
                      <Accordion
                        expanded={expanded === "panel" + index}
                        onChange={handleChange("panel" + index)}
                        key={index}
                        sx={{ mb: 3 }}
                      >
                        <AccordionSummary>
                          <h1 className="text-xl text-white/[0.9]">
                            {question.question}
                          </h1>
                        </AccordionSummary>
                        <AccordionDetails>
                          <p className="text-white/[0.5]">
                            🧩 {question.answer}
                          </p>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="p-10 pt-2 bg-primary">
            <div className="flex flex-col gap-y-10 items-center text-white mt-10 text-center">
              <h1 className="text-5xl font-bold">
                Elevate Your
                <span className="text-6xl custom-heading-snippet"> Coding </span>
                Experience
              </h1>
              <p className="text-white/[0.8] w-3/5 mx-auto">
                Unlock a world of efficiency and innovation with our
                cutting-edge code snippet manager. Seamlessly organize,
                collaborate, and accelerate your coding projects with our
                intuitive platform. Join now to streamline your workflow and
                unleash your coding potential!
              </p>
              <Link to="/auth/sign-in" className="linear-gradient-button w-fit">
                <span className="button-gradient">
                  Start Saving Your Snippets 🚀
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FAQ;
