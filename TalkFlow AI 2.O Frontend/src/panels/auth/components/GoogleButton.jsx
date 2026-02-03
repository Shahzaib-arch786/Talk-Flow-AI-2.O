import Button from "../components/Button"

export default function GoogleButton({ btnColor = "", btnHover = "" }) {
  return (
    <Button variant="outline" className="w-full flex items-center justify-center gap-2" btnColor={btnColor} btnHover={btnHover}>
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        className="w-5"
      />
      Sign in with Google
    </Button>
  )
}
