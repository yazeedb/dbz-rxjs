const $ = document.querySelector.bind(document);
const {
  BehaviorSubject,
  fromEvent,
  interval,
  merge,
  range,
  zip,
  operators: {
    filter
  }
} = rxjs;

const sprite = $('#sprite');
const meterContainer = $('#meter-container');
const meter = $('#meter');

const begin = fromEvent(document, 'keydown');
const end = fromEvent(document, 'keyup');
let powerLevel = 0;

const powerLimits = {
  base: 100,
  ssj: 5000
}

begin
  .subscribe(() => {
    sprite.classList.add('powerup');

    powerLevel += powerLimits.base > powerLevel ? 1 : 0;

    const containerWidth = meterContainer.offsetWidth;
    const newWidth = (powerLevel / powerLimits.base) * containerWidth;

    meter.style.width = `${newWidth}px`;
  });

end
  .subscribe(() => {
    sprite.classList.remove('powerup');
  });
