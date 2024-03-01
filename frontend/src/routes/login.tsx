export default function LoginPage() {
    return (
        <div>
            <h1>Choose your login strategy</h1>
            <a href={(import.meta as any).env.VITE_DISCORD_OAUTH2_LINK}><button>Discord</button></a>
            <a href=""><button>Google</button></a>
        </div>
    )
}