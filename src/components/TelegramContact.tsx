"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import scss from "./TelegramContact.module.scss";
import axios from "axios";

interface TelegramType {
  userName: string;
  email: string;
  subject: string;
  description: string;
}

const TelegramContact = () => {
  const { register, handleSubmit } = useForm<TelegramType>();
  const token = process.env.NEXT_PUBLIC_TG_TOKEN;
  const chat_id = process.env.NEXT_PUBLIC_CHAT_ID;

  const massageModel = (data: TelegramType) => {
    let massage = `𝐮𝐬𝐞𝐫𝐍𝐚𝐦𝐞: <b>${data.userName}</b> \n`;
    massage += `𝐄𝐦𝐚𝐢𝐥 𝐀𝐝𝐝𝐫𝐞𝐬𝐬: <b>${data.email}</b> \n`;
    massage += `𝐒𝐮𝐛𝐣𝐞𝐜𝐭: <b>${data.subject}</b> \n`;
    massage += `𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧: <b>${data.description}</b> \n`;
    return massage;
  };

  const onSubmit: SubmitHandler<TelegramType> = async (data) => {
    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chat_id,
      parse_mode: "html",
      text: massageModel(data),
    });
  };
  return (
    <div className={scss.TelegramContact}>
      <div className="container">
        <div className={scss.content}>
          <h1>TelegramContact</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="User Name"
              {...register("userName", { required: true })}
            />
            <input
              type="text"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            <input
              type="text"
              placeholder="Subject"
              {...register("subject", { required: true })}
            />
            <input
              type="text"
              placeholder="Description"
              {...register("description", { required: true })}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TelegramContact;
