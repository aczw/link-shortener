import { useState, type FormEvent } from "react";

const LinkForm = () => {
  const [message, setMessage] = useState("");
  const [okay, setOkay] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/create", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (response.ok) {
      setOkay(data.message);
    } else {
      setMessage(data.message);
    }
  }

  return (
    <form
      className="flex flex-col"
      onSubmit={submit}
    >
      <label>
        Original
        <input
          type="url"
          name="original"
          className="bg-purple-100"
        />
      </label>
      <button>Send</button>

      {message.length > 0 ? <p>{message}</p> : null}
      {okay.length > 0 ? <a href={`https://go.czw.sh/${okay}`}>go.czw.sh/{okay}</a> : null}
    </form>
  );
};

export { LinkForm };
