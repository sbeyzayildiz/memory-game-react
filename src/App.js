import { useState, useMemo, useEffect } from 'react';
import './App.css';
import Card from './components/Card'


function App() {

  const [frameworks, setFrameWorks] = useState(['angular2', 'vue', 'react', 'grunt', 'phantomjs', 'ember', 'babel', 'ionic', 'gulp', 'meteor', 'yeoman', 'yarn', 'nodejs', 'bower', 'browserify']);

  const [duplicatedFrameWorks, setDuplicateFrameworks] = useState([]);

  const [openedFrameworks, setOpenedFrameworks] = useState([]);

  const [randomizedFrameworks, setRandomizedFrameworks] = useState([]);

  const [finalizedFrameworks, setFinalizedFrameworks] = useState([]);

  const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }


  useEffect(() => {
    const array = [...frameworks]
    setDuplicateFrameworks(array.concat(array));
  }, [frameworks])

  useMemo(() => {
    setRandomizedFrameworks(shuffle(duplicatedFrameWorks));
  }, [duplicatedFrameWorks])

  useMemo(() => {

    const finallyArray = randomizedFrameworks.map((name, index) => { return { name, close: true, complete: false, fail: false } })

    setFinalizedFrameworks(finallyArray);
  }, [randomizedFrameworks])

  useMemo(() => {
    setTimeout(() => {
      check()
    }, 750)
  }, [openedFrameworks])


  const handleClick = (frame, name, index) => {

    let framework = {
      name,
      index
    }


    let frameworks = [...openedFrameworks]
    let array = [...finalizedFrameworks]
    array[index].close = false

    frameworks.push(framework)

    setOpenedFrameworks(frameworks);

    setFinalizedFrameworks(array)

  }

  const check = () => {
    if ((openedFrameworks[0]?.name === openedFrameworks[1]?.name) && (openedFrameworks[0]?.index !== openedFrameworks[1]?.index)) {
      finalizedFrameworks[openedFrameworks[0]?.index].complete = true
      finalizedFrameworks[openedFrameworks[1]?.index].complete = true
    } else {
      finalizedFrameworks[openedFrameworks[0]?.index].close = true
      finalizedFrameworks[openedFrameworks[1]?.index].close = true
    }

    setFinalizedFrameworks(finalizedFrameworks)
    setOpenedFrameworks([]);
  }


  return (
    <div className="playground">
      {
        finalizedFrameworks.map((framework, index) => <Card key={index} framework={framework.name}
          click={(frame) => { handleClick(frame, framework.name, index) }}
          close={framework.close}
          complete={framework.complete}
        />)
      }

    </div>
  );
}

export default App;
