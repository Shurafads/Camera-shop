type StarProps = {
  starHref: string;
}

export default function Star({starHref}: StarProps) {
  return (
    <svg width="17" height="16" aria-hidden="true" data-testid="star">
      <use xlinkHref={starHref}></use>
    </svg>
  );
}
