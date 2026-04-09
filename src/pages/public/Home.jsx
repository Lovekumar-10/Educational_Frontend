import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Brain, BookOpen, Zap } from "lucide-react";

const Home = () => {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        fontFamily: "var(--ff-primary)",
        background: "var(--color-lighter-pink)",
      }}
    >
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-[var(--space-lg)] pt-32 pb-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: "var(--fs-h1)" }}
          className="font-[var(--fw-bold)] text-[var(--color-dark-purple)] leading-tight"
        >
          Learn Smarter with <br />
          <span className="text-[var(--color-purple)]">
            EduGenie AI
          </span>
        </motion.h1>

        <p
          style={{ fontSize: "var(--fs-body)" }}
          className="mt-6 text-[var(--color-gray)] max-w-2xl mx-auto"
        >
          Your AI-powered study assistant that helps you learn faster, solve
          problems, and master concepts effortlessly.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            to="/register"
            className="px-6 py-3 bg-[var(--color-dark-purple)] text-white rounded-[var(--radius-md)] font-[var(--fw-semibold)] shadow-[var(--shadow-card)] hover:scale-105 transition"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="px-6 py-3 border border-[var(--color-dark-purple)] text-[var(--color-dark-purple)] rounded-[var(--radius-md)] font-[var(--fw-semibold)] hover:bg-white transition"
          >
            Login
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-[var(--space-lg)] py-16 grid gap-8 md:grid-cols-3">
        {[
          {
            icon: Brain,
            title: "AI Study Assistant",
            desc: "Get instant answers, explanations, and smart suggestions.",
          },
          {
            icon: BookOpen,
            title: "Smart Learning",
            desc: "Personalized learning paths based on your progress.",
          },
          {
            icon: Zap,
            title: "Fast & Powerful",
            desc: "Instant responses powered by modern AI systems.",
          },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition"
            >
              <Icon
                size={28}
                className="text-[var(--color-purple)] mb-4"
              />
              <h3
                style={{ fontSize: "var(--fs-h5)" }}
                className="font-[var(--fw-bold)] mb-2"
              >
                {item.title}
              </h3>
              <p
                style={{ fontSize: "var(--fs-small)" }}
                className="text-[var(--color-gray)]"
              >
                {item.desc}
              </p>
            </div>
          );
        })}
      </section>

      {/* AI SECTION */}
      <section className="max-w-6xl mx-auto px-[var(--space-lg)] py-20">
        <div className="bg-white rounded-[var(--radius-lg)] p-10 shadow-[var(--shadow-hover)] text-center">
          <Sparkles
            size={32}
            className="mx-auto mb-4 text-[var(--color-purple)]"
          />

          <h2
            style={{ fontSize: "var(--fs-h3)" }}
            className="font-[var(--fw-bold)] text-[var(--color-dark-purple)]"
          >
            Ask Anything. Learn Everything.
          </h2>

          <p className="mt-4 text-[var(--color-gray)]">
            EduGenie AI helps you with assignments, coding, concepts, and
            everything in between.
          </p>

          <Link
            to="/chat"
            className="inline-block mt-6 px-8 py-3 bg-[var(--color-purple)] text-white rounded-[var(--radius-md)] font-[var(--fw-bold)] hover:scale-105 transition"
          >
            Try AI Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;