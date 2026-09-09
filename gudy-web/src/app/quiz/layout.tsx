export default function QuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-text-primary font-sans antialiased">
      {children}
    </div>
  )
}
