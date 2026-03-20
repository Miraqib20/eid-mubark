import { useState, useEffect } from "react";

export default function Home() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);

  // Get name from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlName = params.get("name");
    if (urlName) {
      setName(urlName);
      setShow(true);
    }
  }, []);

  // Fireworks
  useEffect(() => {
    if (!show) return;

    const canvas = document.getElementById("fireworks");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    function createFirework() {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height / 2;

      for (let i = 0; i < 80; i++) {
        particles.push({
          x,
          y,
          radius: 2,
          color: `hsl(${Math.random() * 360}, 100%, 60%)`,
          speedX: (Math.random() - 0.5) * 7,
          speedY: (Math.random() - 0.5) * 7,
          life: 120,
        });
      }
    }

    function animate() {
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;
        p.life--;

        if (p.life <= 0) particles.splice(i, 1);
      });

      requestAnimationFrame(animate);
    }

    const interval = setInterval(createFirework, 700);
    animate();

    return () => clearInterval(interval);
  }, [show]);

  // Share link
  const shareLink = `${window.location.origin}/?name=${name}`;

  // Copy function
  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between text-center bg-black text-white px-4 relative overflow-hidden font-[Poppins]">

      {/* Fireworks */}
      <canvas id="fireworks" className="absolute top-0 left-0 w-full h-full z-0"></canvas>

      {/* Stars */}
      <div className="absolute inset-0 z-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: "2px",
              height: "2px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random(),
            }}
          />
        ))}
      </div>

      {/* Moon */}
      <div className="absolute top-10 right-10 w-28 h-28 bg-yellow-300 rounded-full shadow-[0_0_80px_30px_rgba(255,255,0,0.6)] z-0"></div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col items-center justify-center flex-1 z-10">

        {!show ? (
          <>
            <h1 className="text-5xl md:text-7xl font-bold text-yellow-400 mb-6">
              🌙 Eid Mubarak
            </h1>

            {/* Input */}
            <input
              type="text"
              placeholder="Enter your name..."
              className="mb-4 px-5 py-2 rounded-full text-black outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <button
              onClick={() => setShow(true)}
              className="bg-yellow-400 text-black px-6 py-3 rounded-full text-lg font-semibold hover:scale-110 transition"
            >
              Generate Wish ✨
            </button>
          </>
        ) : (
          <div className="max-w-3xl animate-fadeIn">

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-yellow-400 mb-6">
              🌙 Eid Mubarak {name || "Dear Friend"}
            </h1>

            {/* Wish */}
            <p className="text-2xl md:text-4xl leading-relaxed mb-6">
              ✨ Chand ki roshni se roshan ho aapka har din, <br />
              💖 Khushiyon se bhari ho aapki zindagi har pal, <br />
              🌙 Allah aapko har dukh se mehfooz rakhe, <br />
              🤲 Aur har dua qabool farmaye… Ameen 🙌
            </p>

            {/* Eid Line */}
            <p className="text-2xl md:text-4xl text-yellow-300 font-semibold mb-6">
              🌙 Eid Mubarak to You and Your Family from the Core of My Heart ❤️
            </p>

            {/* Background Text */}
            <h2 className="text-[50px] md:text-[100px] font-bold text-white opacity-10 select-none">
              Alvida Mahe Ramzan
            </h2>

          </div>
        )}
      </div>

      {/* 🔗 SHARE LINK AT BOTTOM */}
      {show && (
        <div className="z-10 px-4 mb-4">
          <div className="bg-white/10 p-4 rounded-xl max-w-xl mx-auto">
            <p className="text-sm mb-2">Share this link:</p>

            <input
              value={shareLink}
              readOnly
              className="w-full p-2 text-black rounded mb-2"
            />

            <button
              onClick={handleCopy}
              className="bg-yellow-400 text-black px-4 py-2 rounded"
            >
              {copied ? "Copied ✅" : "Copy Link"}
            </button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div className="pb-4 z-10">
        <p className="text-gray-400">From Software Developer</p>
        <p className="text-yellow-400 font-bold">Mir Aqib 💻</p>
      </div>

    </div>
  );
}