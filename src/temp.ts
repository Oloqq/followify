import log from './log';
import * as db from './database';
const spotifuncs = require('./spotifuncs')

async function temp() {
  var id = 11182739993;
  // var artistId = '7jrtLe4eVfWhYWZn5vsopg'; // Hinol Polska Wersja
  // var albumId = '2XhJJYqoUDAnfoOL6YNpLO'; // name: 'Od końca do początku',
  // var artistId =  '14M41VoNuxxvBXaigqZ9D9'; // CatchUp
  var artistId = '4z93wkjfGntA0XFqnv4wj7'; // Pezet
  var albumId = '2Y7UmCMczDhjEkq91V0BVR'; // Pezet - Mem (album)
  var trackId = '3SkC2BjGzfbMd65MQ2snzX' // name: 'Nie potrzeba mi nic więcej',
  var playlistId = '6LHRCcXKlpFd5avTwcZUvl'; // 🚁
  var uris = [`spotify:track:${trackId}`];
  var threshold = new Date(Date.parse('2021-05-25'));
  var tmp = 'spotify:track:5GLI6blvhjOMETNDYCs8cJ,spotify:track:3dHTxAVMsnpDFzP2YpGcqK,spotify:track:16SGykoi4jesLxf0avMle6,spotify:track:6hfWeM7B5ITtfNIUfgrbIl,spotify:track:1YlFkmOUZ5BK7i9rrjvEVL,spotify:track:2bArOQKWn7IflGXCHw1n6i,spotify:track:36vrivpLWLtmkl5hHg2tTe,spotify:track:2HgZ8iEWf4tSCvvMC3ELWe,spotify:track:5ajuoUXWErdodjS8wRSIMX,spotify:track:22a5JFzgLniB7wJulAHmv7,spotify:track:5vjFysPQ2luccaoVEcoiUV,spotify:track:4SCfYQD5Dect6z3Y7ZgtuS,spotify:track:6r1CisaMuDooZAlt3XuHKa,spotify:track:6x6gHLN8P1HxzKMAHSBluG,spotify:track:7dPGzLzVRm6gTJyh95zcfw,spotify:track:1n3F1lUDE37hj8eFZBhRyq,spotify:track:1D0cUYgbK74QvpwXtNgmWg,spotify:track:3hBHgybA6taovpU3w21Nco,spotify:track:3JZKHlRdBpn0G4sdcjGhZW,spotify:track:5G2kPOVJWA7lggyxoL1xcm,spotify:track:2bBUq5DMtrvf4nCF5q8GhN,spotify:track:2yk9quUQ9RNdWWtNBvi1sO,spotify:track:5wJDZrAiKt9DXcUHVVwn2I,spotify:track:6sGmX16cnyjVOkAlR8GYQJ,spotify:track:2v3c4cdn5hUo8zIF54dWfu,spotify:track:1hx2aNhY0DA7daiCvim1nb,spotify:track:6W1BGynD2WYx530WwvTr00,spotify:track:70zssqCyjU71rua2RwAWzJ,spotify:track:29uReiCBxFUS2NTORKmLza,spotify:track:5YzhzqUQE7Ss6Hq2L8i7B5,spotify:track:35CJ0tviS0SA5hTsa8E9sc,spotify:track:5Hx6P26NaC5J0VNak2Jetu,spotify:track:4rkfRQ9OXUgnP6bAfSHb12,spotify:track:6oiqkeVbjqVXVjPvzAAyue,spotify:track:7BnnJJJKolDsEWIeT4ucOR,spotify:track:7JjATlQtEm0OeHGJImWQBI,spotify:track:579J1RI0hHmMieWVILlFXG,spotify:track:6fbvwrBCO82vCtyf2eb7rv,spotify:track:0R0XM1iKh1WfHTG3eJGRH0,spotify:track:6A7nrl3jPIwPVHeoztrICk,spotify:track:0YEYEeZyVe5qJkAnOGR36o,spotify:track:0M2F0io2s7TJkiBTOvTmMg,spotify:track:3cuB6gIsqqShwb4N9VQiKg,spotify:track:6KYykcl55ekEQulhzGG9hD,spotify:track:6U9hYbh1xDlsuooEIt0h8W,spotify:track:56idLay1DFH4Ym21JUdKUr,spotify:track:15u1F22hMdIVQ22uJYrH7o,spotify:track:3S97ATyyIqrh9usFEBjy2G,spotify:track:2YwpE8MOBXFY5cZn8KYzpv,spotify:track:7aG6cX5zdudWuSQu6cEGJi,spotify:track:1eYLbtgQfCBkkgdQh3zWN1,spotify:track:7rb0xQ2UT2eblozHTKDYLa,spotify:track:3Ywavuub4UJ9Rb8dmOEEAC,spotify:track:5GGH5CymQZJtQBkE2yNGS7,spotify:track:1XzA8HkDCXmrQGYHwOaNw6,spotify:track:2CEeajigJJJ0D1Xf4P3UbN,spotify:track:1QMTbIjbmqcR6lDvwhL4z5,spotify:track:53zhEnsXXXfuv2zPOY2nOH,spotify:track:0LNjtlHwYa98JtcE9GmbZQ,spotify:track:0dkejiXspX2aO5JwUmeoe0,spotify:track:4ElTGymtQscNtU5x7lwehQ,spotify:track:5zrDi6RkVkXRGaiwq7Sff1,spotify:track:51PPf52jT9m47GcRptUtER,spotify:track:3K6svzSZL37gxlVsbrmwOn,spotify:track:3c29ghbUFuQzNrTGWIb9Ds,spotify:track:3J6rkV1OeUAyilOnCKqJ0A,spotify:track:1cFYlvJXaX39oqWxcfMpBo,spotify:track:52c1WynhJvKJ9FGMb44q58,spotify:track:443u5x9vlXzFyrR12vGW5D,spotify:track:5hGYkZjANryaYTDPx4MIMc,spotify:track:1d1og9vmxHWjpjL6QmsN8W,spotify:track:6OSwclCmr3a6w65jyHBXRS,spotify:track:4JNyQavnfgUnsnIg6KNEdj,spotify:track:3NrFzcpgszXieO6mXG6ziN,spotify:track:27Pnpbm5ZQWDHweVypzuga,spotify:track:0PpHBg84IqKa4hQUUARtLC,spotify:track:0FIM0bJQgTyliALNSznGcE,spotify:track:5hJENfaEudD0HgnfLbWe4N,spotify:track:1oKzAGB6ch59nKkZKpoP6C,spotify:track:2I5dR3tQRAiEfvgt4R7nar,spotify:track:6WFunNejKdFuseMFVJTvIX,spotify:track:2lbElHKWOYQKpOVnVts8WO,spotify:track:0X3TiaSGJxudhcBu87Ug4z,spotify:track:5Yup5AMTfEwfo759xZGJFL,spotify:track:54GhZMrjueIIeE3rxEAUU0,spotify:track:5lDfmASzGhnhmt27LHNiFA,spotify:track:7gkzgsBdSHfND306Hy4NMj,spotify:track:3yfWDricCIW4if2iig0bqA,spotify:track:2HwOyj5zSQeyoERJVT663V,spotify:track:4JNjCdqt8d3IEWbUi3UHL9,spotify:track:0Azg94K2NQyEuIOziCum0q,spotify:track:31bvhJwxOlzPo75BUSg1Kk,spotify:track:73XyQdtl8WA9jQtTAGsBXf,spotify:track:7rvgrmZdQeR1qDdzLLbo4Q,spotify:track:2a1TLGE8RVkVnIBt3FEIJm,spotify:track:317BKia1vQ2fQza3QOSYl0,spotify:track:63yqAyFIlZTKz91NVzR4ro,spotify:track:758BC5O0q8weUpXuNp9irE,spotify:track:0V3vDfdJmTYjLkR3va0UQu,spotify:track:03Xxv6W6ytlrIYOiwcr0NZ,spotify:track:5eMgQ5VOOzsoPniyNjpVXM,spotify:track:00e674SEUik7Wf9bxaQ8uO,spotify:track:4UN7mGq5Qejkla7l5Qli1b,spotify:track:1WwbHNsRQFYVUTYGAyw2V3,spotify:track:0CvXnRizJYYAZyp9b4XZBh,spotify:track:0xfAje5uOWIcPGBcUsibMj,spotify:track:6ji7toELiyMNtxJeMsDLe3,spotify:track:4oLtIf8il5vtxf6ileqHIa,spotify:track:0N8c9bYAL3vaVwAUSg3eMc,spotify:track:4SCfYQD5Dect6z3Y7ZgtuS,spotify:track:6r1CisaMuDooZAlt3XuHKa,spotify:track:6x6gHLN8P1HxzKMAHSBluG,spotify:track:7dPGzLzVRm6gTJyh95zcfw,spotify:track:1n3F1lUDE37hj8eFZBhRyq,spotify:track:1D0cUYgbK74QvpwXtNgmWg,spotify:track:3hBHgybA6taovpU3w21Nco,spotify:track:3JZKHlRdBpn0G4sdcjGhZW,spotify:track:5G2kPOVJWA7lggyxoL1xcm,spotify:track:2bBUq5DMtrvf4nCF5q8GhN,spotify:track:2yk9quUQ9RNdWWtNBvi1sO,spotify:track:5wJDZrAiKt9DXcUHVVwn2I,spotify:track:6sGmX16cnyjVOkAlR8GYQJ,spotify:track:2v3c4cdn5hUo8zIF54dWfu,spotify:track:1hx2aNhY0DA7daiCvim1nb,spotify:track:3XfOrUZyvDLVF2F9WVKZZG,spotify:track:4bkii3sD0eH4TQzkJDsfoC,spotify:track:5X7neI9AffImM9pJLWqYbK,spotify:track:3Xh171TQCs1R5JVN1yBbnw,spotify:track:2eEbSFrCuqlPtTXEVas4Cu,spotify:track:5Og7jcIYVMznEFV3I5oFV0,spotify:track:4t0LzOWqNW3zRZiXEsetKL,spotify:track:3mX8uDnkJ3WW3Z3NRUCxDK,spotify:track:15NDbNdBSyp34YENXYHbSJ,spotify:track:1m2mcwYXyXjjRY2KqYr3VH,spotify:track:3SZMXzhq5bSyrcdutDiUSe,spotify:track:4qcZ1KlLoiw8pvTagytHqb,spotify:track:5T0o9pY7cVy6Fjm33mWzPT,spotify:track:1QNWFGq0E9Vk6mel6lUqxx,spotify:track:1UqXvnTKy7o09oMZquWHmF,spotify:track:3LtmjVwmNgEuvNrKnOsqvS,spotify:track:4oBkus5eH2QRRZ5AMNR31H,spotify:track:3WFP6l6qIQ1S5thaUH0J1C,spotify:track:3dHTxAVMsnpDFzP2YpGcqK,spotify:track:6N975YOMIqDFlU6gr0KpU2,spotify:track:1iA961GuoLlH2setq3alcw,spotify:track:1LGBoxaNalRYudN5GDbOCH,spotify:track:0b5yFgXSlBjjeGBMFuSK7K,spotify:track:2MsntSzpcfjAlLNVE4TA4K,spotify:track:78YedRRe8dD5DecvTNTOEu,spotify:track:5olgrhHalmWhimOi3Czw6x,spotify:track:0NoQlKQh8TgSW4EUKkQI8y,spotify:track:3Pk488JLT88VorcNNxsYSz,spotify:track:0CHcM4BIUOs0DXwYzOCrtn,spotify:track:4cK34NR0q6Or0Sn50J11f2,spotify:track:3cGLhFon0x4hgtVsPXAf6u,spotify:track:4YhErrJOh6OK3fXuJwPxm0,spotify:track:4ednE4f7XdoSDR21o6lFye,spotify:track:1vEdnXCdXKm8w2haTpxiUi,spotify:track:4wrQKS5unBBzJkHWOYJJ7N,spotify:track:1unEcdvlVWjJlpmWkg988x,spotify:track:7rFiRfMheU8J8wlkonbq1s,spotify:track:1ACrEIrtHmsv2GiJNwpVC7,spotify:track:0q9JpIOqAY0LKdXIHDWx9y,spotify:track:6z9z2rYjme9kwg01nGXcrP,spotify:track:4osEEEsZ4ghwIpB2kZ9Ixv,spotify:track:5hP9rXF2w2SJw3hN9bWY62,spotify:track:1qxFRPQllC4H6MRZGZRFm9,spotify:track:7Lp3nZMSYtqyDNOkPy237B,spotify:track:10fNWJvE9BjcubHuTIBp6p,spotify:track:2xVolrKB0r0CbbAbEWa0An,spotify:track:2nVYaOgH1ZEFsp0F44h4Jo,spotify:track:3UpGJ4gly0sSCXcgQ01FR2,spotify:track:5dSuaznlHfM1cCe7dGGiEy,spotify:track:58XNzvi10Otx64md1jhXeO,spotify:track:3Crz07mnlaA3MgSNaXxGVp,spotify:track:2MhOSGCQYfN3YxOmf2KS6S,spotify:track:5khPNoCJ4eqHzayUpC9LED,spotify:track:0W5hlDv0TpyGZVvQgIk6jr,spotify:track:71LkS0PIKAPxg5ptyaS0Wm,spotify:track:41AinSrC2gdY8isOgaWXYz,spotify:track:76Qxw8wfzJu0vhvbc6aYag,spotify:track:0Sig60OQWl0U8EgQMfBnPC,spotify:track:2ej9noyd4qciKOW2BYhpJm,spotify:track:7sYflJKyeq7tlpHBJmuZsW,spotify:track:0Vd8W4i3iMDQunx77f3w1O,spotify:track:5SdyLShGye0ODt80A8uaw3,spotify:track:5jUup854KsF4sUsFtAhzMz,spotify:track:47rKwYHKChKwrw7503T2Bp,spotify:track:2WlxjayA08uyLwZ4xBPKqy,spotify:track:0GBJVmXRR8hrAq9eOgBWkH,spotify:track:1uwmJY3Xjj2knUOzi1YH2x,spotify:track:7GUHw9a1xr4iQt62bQGtf0,spotify:track:7lflMIysS9zWuEw8lTEsBj,spotify:track:0AEHVHd9ynyL1nPachpBWs,spotify:track:2vVFeFFnWpXsM4DauTacQV,spotify:track:4rRKBoWRPuI8G7d12ObSdN,spotify:track:5ZtE8DskJLu4feEa77XHMB,spotify:track:4zH2foi0IjjRqh9RZOirnj,spotify:track:3SkC2BjGzfbMd65MQ2snzX,spotify:track:5UWvnbezydSpnpgXV0KvBf'
  // var tmp = 'spotify:track:5GLI6blvhjOMETNDYCs8cJ,spotify:track:3dHTxAVMsnpDFzP2YpGcqK';
  // var tracks = tmp.split(',');
  // console.log(tracks);

  // spotifuncs.getFollowing(id);
  // spotifuncs.createFromAll(id);
  try {
    // var u = await db.getUser(id);
    // log.info(u);
    // var artists = await spotifuncs.getFollowing(id);
    // console.log(artists);

    // var albums = await spotifuncs.getRecentStuffOfArtist(id, artistId, threshold, 'single');
    // console.log(albums);

    // var tracks = await spotifuncs.getTracksFromAlbum(id, albumId);
    // console.log(tracks);

    // var playlistId = await spotifuncs.createPlaylist(id, 'Test z hinolem');
    // console.log(playlistId);

    // chunks = utils.chunkify(tracks, 100);

    // for (let i = 0; i <= Math.floor(chunks.length / 100); i++) {
    //   spotifuncs.addTracksToPlaylist(id, playlistId, chunks[i]);
    // }

    spotifuncs.createFromAll(id, new Date('2022-09-20'), ['album', 'single']);

    // console.log(await spotifuncs.getRecentTracksOfArtists(id, [artistId],
    //    threshold, ['album', 'single']));

  } catch (error: any) {
    log.error(error);
  }
}

export = temp;