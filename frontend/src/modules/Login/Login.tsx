import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
import { useRegisterMutation } from "@/modules/hooks/useRegisterMutation"
import { Lock, User } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate();

  const {login, userLogger} = useAuth(); 

  const registerMutation = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!username || !password) {
      setError('Por favor, preencha todos os campos.')
      return
    }

    try {
       await login({username, password})
       const logged = userLogger();
       if(logged)
      navigate('/services', {replace: true}); ;
    } catch (error) {
      console.error(error)
      setError('Credenciais inválidas.')
    }
  }

  const handleRegister = () => {
    registerMutation.mutateAsync({username, password});
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Entre com suas credenciais para acessar sua conta.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Nome de usuário</Label>
              <div className="relative">
                <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  placeholder="Digite seu nome de usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-300 text-black" onClick={handleRegister}>Registrar</Button>
          </CardFooter>
          <CardFooter>
            <Button type="submit" className="w-full">Entrar</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}