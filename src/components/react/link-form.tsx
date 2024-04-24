import { useRef, useState, type FormEvent } from "react";

type Status = { type: "none" | "progress" } | { type: "success" | "error"; message: string };

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
      type="submit"
      className="relative rounded-full bg-light/80 px-5 py-3.5 text-dark hover:bg-light/20 hover:font-bold hover:text-light"
    >
      <span
        ref={copiedRef}
        className=" font-semibold selection:bg-dark selection:text-light"
        hidden
      >
        Copied
      </span>
      <span
        ref={copyToRef}
        className="font-semibold selection:bg-dark selection:text-light"
      >
        Copy to clipboard
      </span>
    </button>
  );
};

const StatusComponent = ({ status }: { status: Status }) => {
  switch (status.type) {
    case "none":
      return null;
    case "error":
      return <p className="text-red-300">{status.message}</p>;
    case "progress":
      return <p>Generating...</p>;
    case "success":
      return (
        <div className="flex w-full flex-col justify-center gap-2.5 xs:flex-row xs:items-end">
          <div className="flex grow flex-col gap-1.5">
            <p className="font-semibold">Shortened</p>
            <div className="rounded-full bg-light px-5 py-3.5 text-dark">
              <a
                href={`https://go.czw.sh/${status.message}`}
                target="_blank"
                className="decoration-wavy underline-offset-2 selection:bg-dark selection:text-light hover:font-bold hover:italic hover:underline"
              >
                go.czw.sh/{status.message}
              </a>
            </div>
          </div>

          <CopyButton value={status.message} />
        </div>
      );
  }
};

const LinkForm = () => {
  const [status, setStatus] = useState<Status>({ type: "none" });

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStatus({ type: "progress" });

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
    <section className="flex w-5/6 flex-col items-center gap-5 xs:w-3/4 lg:w-2/3 xl:w-7/12">
      <form
        className="flex w-full flex-col justify-center gap-2.5 xs:flex-row xs:items-end"
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

        <button className="rounded-full bg-light/80 px-5 py-3.5 font-semibold text-dark selection:bg-dark selection:text-light hover:bg-light/20 hover:font-bold hover:text-light">
          Create
        </button>
      </form>

      <StatusComponent status={status} />
    </section>
  );
};

export { LinkForm };
