// 处理歌词

export default function lyricParser (lrc) {
  return {
    /* eslint-disable */
    'lyric': parseLyric(lrc.lrc.lyric || ''),
    'tlyric': parseLyric(lrc.tlyric.lyric || ''),
    'lyricuser': lrc.lyricUser,
    'transuser': lrc.transUser
  }
}
// 解析字符串歌词 类似如下
// [00:00.000] 作词 : 欣怡 CYDNEY↵[00:01.000] 作曲 : 欣怡 CYDNEY↵[00:07.502]编曲：欣怡 Cydney↵[00:09.499]↵[00:12.506]我们面对面↵
export function parseLyric (lrc) {
  const lyrics = lrc.split('\n')
  const lrcObj = []
  for (let i = 0; i < lyrics.length; i++) {
    const lyric = decodeURIComponent(lyrics[i])
    const timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g // 时间戳数组
    const timeRegExpArr = lyric.match(timeReg)
    if (!timeRegExpArr) continue
    const content = lyric.replace(timeReg, '')
    for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
      const t = timeRegExpArr[k]
      const min = Number(String(t.match(/\[\d*/i)).slice(1))
      const sec = Number(String(t.match(/:\d*/i)).slice(1))
      const time = min * 60 + sec
      if (content !== '') {
        lrcObj.push({ time: time, content })
      }
    }
  }
  return lrcObj
  // lrcObj => [{time: 0, content: '作词 : 欣怡 CYDNEY'}, ...]
}
