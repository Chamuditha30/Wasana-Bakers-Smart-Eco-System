import React from "react";

export default function CakeMessageSection({
  cakeMessage,
  setCakeMessage,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="cakeMessage" className="text-muted font-semibold">
        Cake Message (Optional)
      </label>

      <textarea
        id="cakeMessage"
        value={cakeMessage}
        onChange={(e) => setCakeMessage(e.target.value)}
        placeholder="E.g. Happy Birthday!"
        maxLength={100}
        rows={3}
        className="border-border focus:border-primary focus:ring-primary w-full rounded border px-4 py-2 transition-colors outline-none focus:ring-1 md:rounded-lg"
      />

      <p className="text-muted text-right text-sm">
        {cakeMessage.length}/100
      </p>
    </div>
  );
}
