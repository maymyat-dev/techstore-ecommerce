

const AuthLayout = ({
    children
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
         <main className="max-w-7xl mx-auto flex items-center justify-center px-4">
      {children}
    </main>
    )
}

export default AuthLayout;