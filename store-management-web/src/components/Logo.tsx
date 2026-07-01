import logo from "../assets/logo-jota.png";

export function Logo() {
  return (
    <img
      src={logo}
      alt="Jota Store"
      className="w-40 drop-shadow-lg select-none"
    />
  );
}