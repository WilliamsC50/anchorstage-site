export default function Photos() {
  return (
    <main className="bg-white text-gray-900">

      {/* PAGE HEADER */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-4">Photos</h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          A look at events we&apos;ve supported. Corporate conferences, concerts,
          festivals, and touring productions.
        </p>
      </section>

      {/* GALLERY PLACEHOLDER */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center"
            >
              <span className="text-sm text-gray-400">Photo {i + 1}</span>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-6 text-center">
          Gallery content coming soon.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">Work with us on your next event</h2>
          <a
            href="https://intake.anchorstageops.com"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Begin Intake
          </a>
        </div>
      </section>

    </main>
  );
}
