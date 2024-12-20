import React, { Component, use } from "react";
import { FaRobot, FaUser } from "react-icons/fa";
import { PiRobotLight } from "react-icons/pi";
import NoChatRoute from "../NoChatRoute";
import Header from "../Header";
import "./index.css";

class BotHome extends Component {
  state = {
    chatHistory: [],
    isLoading: false,
    userinput: "",
  };
  onChangeUserInput = event => {
    this.setState({ userinput: event.target.value });
}
  handleSendMessage = async () => {
    const userMessage = this.state.userinput;
    if (!userMessage) return; 
    this.setState(prevState => ({
      chatHistory: [
        ...prevState.chatHistory,
        { message: userMessage, sender: "user" }
      ]
    }));
    document.querySelector(".chat-input-field").value = "";
    this.setState({ status: "loading", isLoading: true });

    try {
      const response = await fetch("http://127.0.0.1:5000/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: userMessage }),
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      const botMessage = response.status !== 404 ? `Item: ${data.response.Name} Price: ${data.response.Price} Stock: ${data.response.Stock}`: "Sorry, I am not able to understand that. Please try again.";
      this.setState(prevState => ({
        chatHistory: [
          ...prevState.chatHistory,
          { message:botMessage , sender: "bot" }
        ],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error fetching response from backend:", error);
      this.setState({ status: "error", isLoading: false });
    }
  };

  renderChatHistory = () => {
    const { chatHistory } = this.state;
    return chatHistory.map((chat, index) => {
      const { message, sender } = chat;
      return (
        <li key = {index}
          className={`chat-item ${sender === "bot" ? "bot-message" : "user-message"}`}
        >
          <div className="message-icon">
            {sender === "bot" ? (
              <FaRobot size={30} color="#4caf50" /> 
            ) : (
              <FaUser size={30} color="#2196f3" /> 
            )}
          </div>
          <p>{message}</p>
        </li>
      );
    });
  };

  render() {
    const { chatHistory, status, isLoading } = this.state;
    const noChat = chatHistory.length === 0;
    return (
    <>
        <Header />
      <div className="bot-home-container">
        <div className="chat-container">
          <div className="history-list">
            <ul>
                {noChat ? (
                    <NoChatRoute/>
                ) : (
                    this.renderChatHistory()
                )}
            </ul>
          </div>

          <div className="chat-input-container">
            <div className="icon-container">
            <PiRobotLight size={50} color="white" />
            </div>
            <input
              type="text"
              className="chat-input-field"
              placeholder="Search for an item"
              onChange={this.onChangeUserInput}
            />
            <button
              type="button"
              className="send-button"
              onClick={this.handleSendMessage}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </>
    )
  }
}

export default BotHome;
