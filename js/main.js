/* SONG DATA */
const songList = [
    {
        title: "Yoshi's Island",
        file: 'FlowerYoshisland.mp3',
        cover: 'yoshisland.jpeg'
    },
    {
        title: "Super Mario Bros Theme",
        file: 'SuperMarioBrosThemesong.mp3',
        cover: 'superMarioBros.jpeg'
    },
    {
        title: "The Legend Of Zelda - Majora's Mask",
        file: 'LostWoodsTheLegendofZelda.mp3',
        cover: 'theLegendOfZelda.jpeg'
    },
    {
        title: "Megaman 2 - Dr. Willy",
        file: 'Megaman2.mp3',
        cover: 'Megaman2.png'
    },
    {
        title: "Sonic The Hedgehog - Green Hill Zone Theme",
        file: 'Sonic.mp3',
        cover: 'Sonic.jpeg'
    }
];


/* Actual Song */
let actualSong = null


/* Get elements */
const songs = document.getElementById('songs');
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const play = document.getElementById('play');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const currentSongTime = document.getElementById('current-time');
const songDuration = document.getElementById('duration');
const volumeIcon = document.getElementById('volume-icon');
const volume = document.getElementById('volume');
const volumeBgBar = document.getElementById('volume-bg-bar');

audio.volume = 0.5

/* Listening controlls clicks */
play.addEventListener('click', () => {
    if (actualSong !== null) {
        if (audio.paused) {
            if (actualSong !== null) {
                audio.play()
                updateControls()
            }
        } else {
            audio.pause()
            updateControls()
        };
    }
});

prev.addEventListener('click', () => prevSong())
next.addEventListener('click', () => nextSong())

/* Listening audio element */
audio.addEventListener('timeupdate', ()=>{
    updateProgress()
    if(audio.ended){
        nextSong()
    }
})

progressContainer.addEventListener('click',(e)=> setProgress(e));

volumeIcon.addEventListener('click',()=> showVolumeBar());

volumeBgBar.addEventListener('click',(e)=> updateVolume(e));



/* Loading songs and showing list */
const loadSongs = () => {
    songList.forEach((song, index) => {

        const li = document.createElement('li');
        const link = document.createElement('a');

        let indexList = index + 1
        link.textContent = `${indexList}. ${song.title}`;
        link.href = '#';
        /* Click Sound */
        link.addEventListener('click', () => loadSong(index))

        li.appendChild(link);

        songs.appendChild(li);
    })
}

/* Loading selected song */
const loadSong = (songIndex) => {
    if (songIndex !== actualSong) {
        ChangeActiveClass(actualSong, songIndex)

        actualSong = songIndex

        audio.src = './audio/' + songList[songIndex].file
        audio.play()

        cover.src = './img/' + songList[songIndex].cover
        title.textContent = songList[songIndex].title

        updateControls()
    }
}



/* Updating Controls */
const updateControls = () => {
    if (audio.paused) {
        play.classList.remove('fa-pause')
        play.classList.add('fa-play')
    } else {
        play.classList.add('fa-pause')
        play.classList.remove('fa-play')

    }
}



/* Seting progress */
const setProgress = (e) =>{
    if(actualSong !== null){
        const totalWidth = progressContainer.offsetWidth
        const progressWidth = e.offsetX
    
        const percent = progressWidth * 100 / totalWidth
        progress.style.width = percent + '%'
    
        audio.currentTime = audio.duration * percent / 100
    }
}


/* Updating Progress Bar */
const updateProgress = () => {
    let widthPorcent = (audio.currentTime * 100) / audio.duration;
    progress.style.width = `${widthPorcent}%`;

    let durationMinutes = Math.floor(audio.duration / 60);
    let durationSeconds = Math.floor((audio.duration / 60 % 1) * 60);
    
    
    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSeconds = Math.round((audio.currentTime / 60 % 1) * 60);

    if(isNaN(durationMinutes)){
        songDuration.textContent = '0:00';
        currentSongTime.textContent = '0:00';
    }else{
        songDuration.textContent = `${durationMinutes}:${durationSeconds}`;
        if(currentSeconds.toString().length == 1){
            currentSongTime.textContent = `${currentMinutes}:0${currentSeconds}`;
        }else{
            currentSongTime.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    }

};



/* Change Active Class */
const ChangeActiveClass = (lastIndex, newIndex) => {
    const links = document.querySelectorAll('a')
    if (lastIndex !== null) {
        links[lastIndex].classList.remove('active')
    }
    links[newIndex].classList.add('active')

}


/* Loading Prev Song */
const prevSong = () => {
    if(actualSong !== null){
        if(actualSong > 0){
            loadSong(actualSong - 1)
        }else{
            loadSong(songList.length - 1)
        }
    }
}

/* Loading next Song */
const nextSong = () => {
    if(actualSong !== null){
        if(actualSong < songList.length -1){
            loadSong(actualSong + 1);
        }else{
            loadSong(0)
        }
    }
};


/* Showing volume bar */
const showVolumeBar = () => volumeBgBar.classList.toggle('active');

/* Updating Songs volume */
const updateVolume = (e) =>{
    console.log(e.offsetY / 100);

    audio.volume = e.offsetY / 100;

    volume.style.height = `${e.offsetY}%`
}



/* Calling load songs */
loadSongs()