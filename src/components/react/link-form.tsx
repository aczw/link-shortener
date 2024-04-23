import { useRef, useState, type FormEvent } from "react";

type Status = { type: "none" } | { type: "success" | "error"; message: string };

const CopyButton = ({ value }: { value: string }) => {
  const [timeoutId, setTimeoutId] = useState(-1);
  const copiedRef = useRef<HTMLSpanElement>(null);
  const copyToRef = useRef<HTMLSpanElement>(null);

  function handleClick() {
    window.clearTimeout(timeoutId);

    navigator.clipboard.writeText(`go.czw.sh/${value}`);

    copiedRef.current!.removeAttribute("hidden");
    copyToRef.current!.style.opacity = "0";

    const id = window.setTimeout(() => {
      copiedRef.current!.setAttribute("hidden", "");
      copyToRef.current!.style.opacity = "100";
    }, 2000);

    setTimeoutId(id);
  }

  return (
    <button
      onClick={handleClick}
      className="relative rounded-full bg-light/80 px-5 py-3.5 text-dark hover:bg-light/20 hover:font-bold hover:text-light"
    >
      <span
        ref={copiedRef}
        className="absolute inset-x-0"
        hidden
      >
        Copied
      </span>
      <span
        ref={copyToRef}
        className="font-semibold"
      >
        Copy to clipboard
      </span>
    </button>
  );
};

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
    <section className="xs:w-3/4 flex w-5/6 flex-col items-center gap-5 lg:w-2/3 xl:w-7/12">
      <form
        className="xs:flex-row xs:items-end flex w-full flex-col justify-center gap-2.5"
        onSubmit={submit}
      >
        <label className="flex grow flex-col gap-1.5">
          <span className="font-semibold">Original</span>
          <input
            name="original"
            className="rounded-full bg-light px-5 py-3.5 text-dark placeholder-dark/80 selection:bg-dark selection:text-light"
            placeholder="Enter a URL, e.g. https://charleszw.com/"
          />
        </label>

        <button className="rounded-full bg-light/80 px-5 py-3.5 font-semibold text-dark hover:bg-light/20 hover:font-bold hover:text-light">
          Create
        </button>
      </form>

      {status.type !== "none" ? (
        status.type === "error" ? (
          <p className="text-red-300">{status.message}</p>
        ) : (
          <div className="xs:flex-row xs:items-end flex w-full flex-col justify-center gap-2.5">
            <div className="flex grow flex-col gap-1.5">
              <p className="font-semibold">Shortened</p>
              <div className="rounded-full bg-light px-5 py-3.5 text-dark selection:bg-dark selection:text-light">
                <a
                  href={`https://go.czw.sh/${status.message}`}
                  target="_blank"
                  className="decoration-wavy underline-offset-2 hover:underline"
                >
                  go.czw.sh/{status.message}
                </a>
              </div>
            </div>

            <CopyButton value={status.message} />
          </div>
        )
      ) : null}
    </section>
  );
};

export { LinkForm };
