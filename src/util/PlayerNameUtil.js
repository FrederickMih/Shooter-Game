let playerName = 'your name';

const setName = (receivedName) => {
  if (receivedName === '' || typeof receivedName !== 'string') {
    playerName = 'unnamed';
  } else {
    playerName = receivedName;
  }
};

const getName = () => playerName;

export { setName, getName };
