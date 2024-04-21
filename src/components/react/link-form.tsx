import { useState, type FormEvent } from "react";

type Status = { type: "none" } | { type: "success" | "error"; message: string };

const LinkForm = () => {
  const [status, setStatus] = useState<Status>({ type: "none" });

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/create", {
      method: "POST",
      body: formData,
    });
    const message = await response.text();

    if (response.ok) {
      setStatus({ type: "success", message });
    } else {
      setStatus({ type: "error", message });
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
          type="text"
          name="original"
          className="bg-purple-100"
        />
      </label>
      <button>Send</button>

      {status.type !== "none" ? (
        status.type === "error" ? (
          <p>{status.message}</p>
        ) : (
          <a href={`https://go.czw.sh/${status.message}`}>go.czw.sh/{status.message}</a>
        )
      ) : null}
    </form>
  );
};

export { LinkForm };
