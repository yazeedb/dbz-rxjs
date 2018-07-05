const $ = document.querySelector.bind(document);
const {
  BehaviorSubject,
  fromEvent,
  interval,
  merge,
  range,
  zip,
  operators: {
    filter,
    scan,
    startWith,
    tap
  }
} = rxjs;

const sprite = $('#sprite');
const meterContainer = $('#meter-container');
const meter = $('#meter');

const begin = fromEvent(document, 'keydown');
const end = fromEvent(document, 'keyup');
// let powerLevel = 0;

const powerLevels = {
  base: 100,
  ssj: 5000
}

begin.pipe(
  tap(() => {
    sprite.classList.add('powerup');
  }),
  scan(acc => acc + 1, 0),
  filter(level => level > 100)
)
.subscribe(power => {
  console.log({ power });

  sprite.classList.remove('base');
  sprite.classList.add('ssj');
});

end.subscribe(() => {
  sprite.classList.remove('powerup');
})

//
// begin
//   .subscribe(() => {
//     sprite.classList.add('powerup');
//
//     powerLevel += powerLimits.base > powerLevel ? 1 : 0;
//
//     const containerWidth = meterContainer.offsetWidth;
//     const newWidth = (powerLevel / powerLimits.base) * containerWidth;
//
//     meter.style.width = `${newWidth}px`;
//   });
//
// end
//   .subscribe(() => {
//     sprite.classList.remove('powerup');
//   });
