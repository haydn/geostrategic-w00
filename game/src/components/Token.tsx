import Icon from "./Icon";

const Token = ({
  x,
  y,
  width,
  height,
  icon,
  color,
  owner,
  onClick,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  icon: string | undefined;
  color: number | undefined;
  owner: boolean;
  onClick: (event: React.MouseEvent<SVGGElement, MouseEvent>) => void;
}) => {
  const fill =
    color === undefined
      ? `oklch(74% 0 0)`
      : owner
      ? `oklch(74% 0.14 ${color})`
      : `oklch(74% 0.02 ${color})`;
  return (
    <g
      transform={`translate(${x + width / 2},${y + height / 2})`}
      onClick={onClick}
    >
      <rect
        x={-width / 2}
        y={-height / 2}
        width={width}
        height={height}
        fill={fill}
        rx={5}
        stroke={"#000"}
        strokeWidth={2}
      />
      {width > 32 && height > 32 ? <Icon value={icon} /> : null}
    </g>
  );
};

Token.displayName = "Token";

export default Token;
