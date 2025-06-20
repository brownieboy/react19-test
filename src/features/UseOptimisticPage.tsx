import { useOptimistic, useState, useRef, startTransition } from 'react';
import { deliverMessage } from './actions';
import { Breadcrumbs } from '../components/Breadcrumbs.jsx';

type Message = {
  text: string;
  sending?: boolean;
};

type ThreadProps = {
  messages: Message[];
  sendMessageAction: (formData: FormData) => void;
};

function Thread({ messages, sendMessageAction }: ThreadProps) {
  const formRef = useRef<HTMLFormElement>(null);

  function formAction(formData: FormData) {
    const message = formData.get('message');
    if (typeof message !== 'string') {
      return;
    }
    addOptimisticMessage(message);
    formRef.current?.reset();
    startTransition(async () => {
      await sendMessageAction(formData);
    });
  }

  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    Message[],
    string
  >(messages, (state, newMessage) => [
    {
      text: newMessage,
      sending: true,
    },
    ...state,
  ]);

  return (
    <>
      <form action={formAction} ref={formRef}>
        <input type='text' name='message' placeholder='Hello!' />
        <button type='submit'>Send</button>
      </form>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small> (Sending...)</small>}
        </div>
      ))}
    </>
  );
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello there!', sending: false },
  ]);
  async function sendMessageAction(formData: FormData) {
    const raw = formData.get('message');
    if (typeof raw !== 'string') return;

    const sentMessage = await deliverMessage(raw);
    startTransition(() => {
      setMessages((messages) => [{ text: sentMessage }, ...messages]);
    });
  }
  return (
    <>
      <Breadcrumbs />
      <Thread messages={messages} sendMessageAction={sendMessageAction} />
    </>
  );
}
