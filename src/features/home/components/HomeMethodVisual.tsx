type MethodStage = {
  index: string;
  title: string;
};

type HomeMethodVisualProps = {
  active: number;
  stages: readonly MethodStage[];
};

export default function HomeMethodVisual({
  active,
  stages,
}: HomeMethodVisualProps) {
  return (
    <div
      className="home-method-visual"
      data-active={active}
      aria-hidden="true"
    >
      <div className="home-method-visual__coordinate">
        <span>X / 24.07</span>
        <span>Y / PRODUCT</span>
      </div>

      <div className="home-method-visual__request">
        <span>INPUT</span>
        <i />
        <i />
        <i />
      </div>

      <svg
        className="home-method-visual__route"
        viewBox="0 0 720 320"
        role="presentation"
      >
        <defs>
          <linearGradient id="home-method-signal" x1="0" x2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="0.5" stopColor="currentColor" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.25" />
          </linearGradient>
        </defs>
        <path
          className="home-method-visual__route-ghost"
          d="M42 160 C120 160 128 72 226 72 S332 248 430 248 S518 116 678 116"
        />
        <path
          className="home-method-visual__route-signal"
          pathLength="1"
          d="M42 160 C120 160 128 72 226 72 S332 248 430 248 S518 116 678 116"
        />
        {[0, 1, 2, 3].map((index) => {
          const points = [
            { x: 128, y: 126 },
            { x: 272, y: 108 },
            { x: 430, y: 248 },
            { x: 590, y: 116 },
          ];
          return (
            <g
              key={index}
              className="home-method-visual__node"
              data-reached={active >= index ? "true" : "false"}
              transform={`translate(${points[index].x} ${points[index].y})`}
            >
              <circle r="18" />
              <circle r="5" />
            </g>
          );
        })}
      </svg>

      <div className="home-method-visual__product">
        <div className="home-method-visual__toolbar">
          <span />
          <span />
          <span />
          <i>DOMINASE / SYSTEM</i>
        </div>
        <div className="home-method-visual__screen">
          <span className="home-method-visual__screen-title" />
          <span className="home-method-visual__screen-copy" />
          <span className="home-method-visual__screen-action" />
          <div className="home-method-visual__screen-nav">
            <i />
            <i />
            <i />
          </div>
          <div className="home-method-visual__screen-modules">
            <i />
            <i />
            <i />
          </div>
          <div className="home-method-visual__feedback">
            <span />
          </div>
        </div>
      </div>

      <div className="home-method-visual__state">
        <span>{stages[active].index}</span>
        <strong>{stages[active].title}</strong>
      </div>
    </div>
  );
}
