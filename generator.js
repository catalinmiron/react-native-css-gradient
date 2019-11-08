/*
  TODO: write tests (lazy) like always right? <3
*/
const parser = require("gradient-parser");
const memoize = require("fast-memoize");

const getColor = color => {
  switch (color.type) {
    case "hex":
      return `#${color.value}`;
    case "literal":
      return color.value;
    default:
      return `${color.type}(${color.value.join(",")})`;
  }
};

const getColorsAndLocations = memoize((colorStops, maxWidth) =>
  colorStops.reduce(
    (acc, color, index) => {
      acc.colors = [...acc.colors, getColor(color)];

      // PX value for location will break!
      // TODO Make it happen for px + repeat?
      const locationValue = getPixelsForColor(color, colorStops.length, index, maxWidth);
      acc["locations"] = [...acc.locations, locationValue];

      return acc;
    },
    { colors: [], locations: [] }
  )
);

const getPixelsForColor = memoize((color, colorsLength, index, maxWidth) => {
  const { length } = color;
  if (!length) {
    return (1 / (colorsLength - 1)) * index;
  }
  if (length.type === "px") {
    return parseFloat(length.value);
  }
  if (length.type === "%") {
    if (maxWidth) {
      return (parseFloat(length.value) * maxWidth) / 100;
    } else {
      return length.value / 100;
    }
  }
});

const getRepeatingColorsAndLocations = (colorStops, sizes) => {
  const { width: maxWidth, height: maxHeight } = sizes;
  const { colors: initialColors, locations: initialLocations } = getColorsAndLocations(colorStops, maxWidth);
  const maxValue = parseFloat(initialLocations.slice(-1)[0]);
  const increment = maxValue / maxWidth;
  // we need to add +1 but this is breaking LinearGradient, maybe can't render
  // it outside the viewport.
  const maxChunks = Math.round(maxWidth / maxValue);
  const locations = [...Array(maxChunks).keys()].reduce((acc, i) => {
    return [
      ...acc,
      ...initialLocations.map(j => {
        return j / maxWidth + increment * i;
      })
    ];
  }, []);
  const colors = locations.map((_, i) => initialColors[i % initialColors.length]);

  return { colors, locations };
};

const getVectorsByDirection = memoize(direction => {
  switch (direction) {
    case "top":
      return getVectorsByAngle(0);
    case "right":
      return getVectorsByAngle(90);
    case "bottom":
      return getVectorsByAngle(180);
    case "left":
      return getVectorsByAngle(270);
    case "left top":
      return getVectorsByAngle(270 + 45);
    case "left bottom":
      return getVectorsByAngle(180 + 45);
    case "right top":
      return getVectorsByAngle(45);
    case "right bottom":
      return getVectorsByAngle(90 + 45);
  }
});

const round = memoize(number => Math.round(number * 10000) / 10000);
const degreesToRadians = memoize(degrees => (degrees * Math.PI) / 180);

const getVectorsByAngle = memoize(alfa => {
  const angle = degreesToRadians(alfa);

  let gradientLineLength = round(Math.abs(Math.sin(angle)) + Math.abs(Math.cos(angle)));
  let center = { x: 0.5, y: 0.5 };

  let yDiff = (Math.sin(angle - Math.PI / 2) * gradientLineLength) / 2;
  let xDiff = (Math.cos(angle - Math.PI / 2) * gradientLineLength) / 2;

  return {
    start: {
      x: center.x - xDiff,
      y: center.y - yDiff
    },
    end: {
      x: center.x + xDiff,
      y: center.y + yDiff
    }
  };
});

const getVectorsByOrientation = orientation => {
  return orientation.type === "directional"
    ? getVectorsByDirection(orientation.value)
    : getVectorsByAngle(orientation.value);
};

const generateGradient = memoize((gradient, sizes) => {
  return parser.parse(gradient).map(({ type, colorStops, orientation }) => {
    // YOLO: Radial gradients <3
    if (type === "radial-gradient") {
      return "Only linear-gradient type is supported for now";
    }
    const colorsAndLocations =
      type === "linear-gradient"
        ? getColorsAndLocations(colorStops)
        : getRepeatingColorsAndLocations(colorStops, sizes);

    return {
      ...colorsAndLocations,
      ...getVectorsByOrientation(orientation)
    };
  });
});

export default generateGradient;
