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

const main = () => {
  const { fromEvent } = rxjs;
  const { filter, map, scan, tap } = rxjs.operators;

  const begin = fromEvent(document, 'keydown');
  const end = fromEvent(document, 'keyup');

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
  });
};

main();
