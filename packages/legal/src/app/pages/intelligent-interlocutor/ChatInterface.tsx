import React, {
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  useRef,
} from "react";
import { useIntl } from "react-intl";

interface Message {
  type: "user" | "ai";
  content: string;
}

const ChatInterface: React.FC = () => {
  const intl = useIntl();
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      const newUserMessage: Message = {
        type: "user",
        content: inputText,
      };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setInputText("");
      setIsLoading(true);

      setTimeout(() => {
        const newAIMessage: Message = {
          type: "ai",
          content: intl.formatMessage({ id: "AIResponseContent" }),
        };
        setMessages((prevMessages) => [...prevMessages, newAIMessage]);
        setIsLoading(false);
      }, 3000);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  return (
    <div className="border rounded">
      <div className="bg-dark pt-2 px-5 border chatGpt rounded">
        <div className="d-flex">
          <div className="d-flex justify-content-center align-items-center bg-primary rounded-circle style-big-sircle-chatgpt">
            <i className="fas fa-robot text-white fa-2x"></i>
          </div>
          <div>
            <div className="mx-3 mb-0">
              <span className="text-primary">
                {intl.formatMessage({ id: "Welcome!" })}
              </span>
            </div>
            <div className="mx-3 font-weight-bold mb-0">
              <p className="text-white fs-5">
                {intl.formatMessage({ id: "HowCanIHelpYou?" })}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-light-white pt-3 pb-1 px-5 border mh-483px overflow-scroll">
        <div className="d-flex position-relative mb-3">
          <div className="d-flex justify-content-center align-items-center rounded-circle border border-primary position-absolute style-circle-one-chatGpt">
            <i className="fas fa-user text-primary"></i>
          </div>
          <div className="bg-light-primary w-55 pt-2 ps-3 pe-6 mx-9 pb-0 style-border-text-develop-chatjpt">
            <p className="text-black fs-6 fw-bold">
              {intl.formatMessage({
                id: "HowDevelopmentInTheFieldOfElectronicsWasAchievedInTheKingdomOfSaudiArabia",
              })}
            </p>
          </div>
        </div>

        <div className="d-flex justify-content-end mx-6 pt-3 mb-3">
          <div className="bg-white w-75 pt-3 ps-3 pe-6 mx-1 style-border-text-develop-chatjpt">
            <div className="text-black fs-6">
              <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                <p className="style-paragraph-chat-gpt">
                  {intl.formatMessage({ id: "TiTleParagraphSmartAxes" })}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <p className="style-paragraph-chat-gpt mb-0 mx-3">
                  {intl.formatMessage({ id: "ParagraphSmartAxes1" })}
                </p>
                <p className="style-paragraph-chat-gpt mb-0 mx-3">
                  {intl.formatMessage({ id: "ParagraphSmartAxes2" })}
                </p>
                <p className="style-paragraph-chat-gpt mx-3">
                  {intl.formatMessage({ id: "ParagraphSmartAxes3" })}
                </p>
              </div>
            </div>
          </div>
          <div className="position-relative">
            <div className="bg-primary d-flex justify-content-center align-items-center rounded-circle border border-primary position-absolute style-circle-two-chatGpt">
              <i className="fas fa-robot text-white"></i>
            </div>
          </div>
        </div>

        {messages.map((message, index) => (
          <React.Fragment key={index}>
            {message.type === "user" && (
              <div className="d-flex position-relative mb-3">
                <div className="d-flex justify-content-center align-items-center rounded-circle border border-primary position-absolute style-circle-one-chatGpt">
                  <i className="fas fa-user text-primary"></i>
                </div>
                <div className="bg-light-primary w-55 pt-2 ps-3 pe-6 mx-9 pb-0 style-border-text-develop-chatjpt">
                  <p className="text-black fs-6 fw-bold">{message.content}</p>
                </div>
              </div>
            )}
            {message.type === "ai" && (
              <div className="d-flex justify-content-end mx-6 pt-3 mb-3">
                <div className="bg-white w-75 pt-3 ps-3 pe-6 mx-1 style-border-text-develop-chatjpt">
                  <div className="text-black fs-6">
                    <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                      <p className="style-paragraph-chat-gpt">
                        {intl.formatMessage({
                          id: "TiTleParagraphSmartAxes",
                        })}
                      </p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <p className="style-paragraph-chat-gpt mb-0 mx-3">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="position-relative">
                  <div className="bg-primary d-flex justify-content-center align-items-center rounded-circle border border-primary position-absolute style-circle-two-chatGpt">
                    <i className="fas fa-robot text-white"></i>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}

        {isLoading && (
          <div className="d-flex justify-content-center my-3">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />

        <div className="d-flex flex-column justify-content-center align-items-center p-2 rounded">
          <div className="mb-2">
            <i className="fas fa-robot text-primary fa-2x"></i>
          </div>
          <div className="fs-4 mb-4 text-bold-chat-gpt">
            {intl.formatMessage({ id: "WasThisAnswerHelpful?" })}
          </div>
          <div className="d-flex justify-content-center">
            <button className="me-2 btn text-dark border border-primary px-0 py-1 rounded text-center bg-hover-primary text-hover-white w-60px">
              {intl.formatMessage({ id: "Yes" })}
            </button>
            <button className="btn text-dark border border-primary px-0 py-1 rounded text-center bg-hover-primary text-hover-white w-60px">
              {intl.formatMessage({ id: "No" })}
            </button>
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center px-3 py-1 bg-light rounded w-100">
        <div className="d-flex justify-content-center align-items-center width-icon-chatjpt">
          <i className="fas fa-broom fs-3"></i>
        </div>
        <div className="flex-grow-1 mx-2">
          <input
            type="text"
            className="form-control"
            placeholder={intl.formatMessage({
              id: "WhatAreTheRadicalSolutionsToPowerOutages",
            })}
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="d-flex justify-content-center align-items-center width-icon-chatjpt">
          <button className="btn p-0" onClick={handleSendMessage}  aria-label={intl.formatMessage({ id: "Actions" })}>
            <i className="fas fa-paper-plane fs-3 text-primary rotate-icon-chatgpt"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
