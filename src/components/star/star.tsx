type StarProps = {
  starHref: string;
}

export default function Star({starHref}: StarProps) {
  return (
    <svg width="17" height="16" aria-hidden="true">
      <use xlinkHref={starHref}></use>
    </svg>
  );
}
