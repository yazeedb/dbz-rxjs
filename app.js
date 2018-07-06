const $ = document.querySelector.bind(document);
const sprite = $('#sprite');
const meterContainer = $('#meter-container');
const meter = $('#meter');

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

const fillMeter = (level) => {
  const containerWidth = meterContainer.offsetWidth;
  const divideBy = level >= 100 ? level : 100;
  const newWidth = (level / divideBy) * containerWidth;

  meter.style.width = `${newWidth}px`;
};

const main = () => {
  const { fromEvent } = rxjs;
  const { filter, map, scan, tap } = rxjs.operators;

  const begin = fromEvent(document, 'keydown');
  const end = fromEvent(document, 'keyup');

  begin.pipe(
    scan(acc => acc + 1, 0),
    tap((level) => {
      sprite.classList.add('powerup');
      fillMeter(level);
    }),
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
  });
};

main();
