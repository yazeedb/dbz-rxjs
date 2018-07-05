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
    map,
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

// const powerLevels = {
//   base: 100,
//   ssj: 5000
// };

const powerLevels = {
  100: {
    current: 'base',
    previous: null,
    next: 'ssj'
  },
  1000: {
    current: 'ssj',
    previous: 'base',
    next: null
  }
};

begin.pipe(
  tap(() => {
    sprite.classList.add('powerup');
  }),
  scan(acc => acc + 1, 0),
  map(level => powerLevels[level]),
  filter(level => level && level.next)
)
.subscribe(({ next, previous }) => {
  console.log({ next, previous });

  sprite.classList.remove(previous);
  sprite.classList.add(next);
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
