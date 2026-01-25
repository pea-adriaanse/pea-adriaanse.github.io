<details>

<summary>

# Rendering Text

While working on gui support for my rendering engine, I stumbled upon a surprisingly complex subject: _text rendering_.

![Sponza Render](/images/render.png#rounded)

---

</summary>

The simplest reasonable approach to rendering text I've found is only supporting a limited set of simple characters (like ascii), rendering all characters using a single font to a texture (glyph atlas), and sampling from it in the fragment shader of any particular surface containing text.

Ignoring fonts for a bit, there's already a potential for interesting methods. Take [Valve's Signed Distance Field (SDF) approach](https://steamcdn-a.akamaihd.net/apps/valve/2007/SIGGRAPH2007_AlphaTestedMagnification.pdf) for example (I won't go into detail, and doubt it's unique). Add fonts and kerning to the mix and things are already getting more complex.

![Kerning](/images/Kerning_EN.svg)
_Kerning example._

The primary source of this adventure was, however, my stubbornness to support Unicode.

### Unicode

Whereas ascii support only requires the creation of relatively simple atlases with 94 characters, with one atlas per font, the creation of one universal atlas is no longer viable. Unicode currently defines 96,382 characters, and can support more than a million (1,114,112)[[1]](https://docs.oracle.com/cd/E19253-01/817-2521/overview-207/index.html). Naturally, fonts don't support all these characters (I'm not aware of any that do*). This introduces the needs to keep track of several fonts in order to support a wide range of styles and characters (such as Chinese characters, Hangul, and Arabic).

This however brings me to a topic of examplary concern: Arabic script.
As a writing system, Arabic script is written right to left. It uses connected letters whose shapes depend on their context (somewhat, but not at all, like kerning), and accompanies a multitude of variants. It even includes optional diacritics and mandatory ligatures. When arabic (like "اَلْفُصْحَىٰ") is combined with or embedded within text that may even include top-to-bottom use of Chinese characters, the complexity becomes overwhelming. At some point one begins to question what the rendered text should even look like.

The complexity of rendering "valid" unicode is nicely examplified by [Zalgo text](https://en.wikipedia.org/wiki/Zalgo_text):


> Z̶̷̲̬̲̉̍̂̀ͬ͆̎͠ȧ̞͉̍͗̏͑ḻ̙͇̺̝̂̇̑ͧ̆̀́͘͞ğ̐o̧͖͕͔̜̓͆͒͗̍̓͑̔̈́

> ⱿᕔԸǤꗞ &nbsp; <- _(technically not proper Zalgo text)_

The fact unicode can treat text this way and includes all these characters even introduces problems outside the scope of rendering. The support for bidirectional text for example introduces a software vulnerability aptly named ["Trojan Source"](https://en.wikipedia.org/wiki/Trojan_Source), whereby code can be obfuscated in such a way the actual behavior can be hidden. _Patches to compilers and IDE's have been created because of this!_

In another case, browsers have had to adapt to protect users from [homograph attacks](https://en.wikipedia.org/wiki/IDN_homograph_attack) that imitate existing web domains using character look-alikes:

| spoof | real |
| ----- | ---- |
| wikipediа.org | wikipedia.org |
| adoḅe.com | adobe.com |

At this point I haven't even mentioned text decorations like _italic_ and **bold**, which are typically implemented using complementary fonts. Unicode ironically has additional codepoints for this.
Supposedly these exist for use in math, but the addition of Fraktur, with even a bold version, makes me question the validity of this approach. 𝕴'𝖒 𝖓𝖔𝖙 𝖊𝖛𝖊𝖓 𝖏𝖔𝕶𝖎𝖓𝖌.

### Solution

There are of course solutions to this mess. Thankfully (open source) solutions have existed for years. Text shaping engines like [HarfBuzz](https://harfbuzz.github.io/) for example, even used by Adobe, implement glyph selection and placement. Rendering of the actual glyphs can be performed using a text/font rendering engine like [FreeType](https://freetype.org/). Interestingly both of these are being [rewritten in Rust!](https://behdad.org/text2024/) Their importance and complexity require safety guarantees C(++) couldn't offer.

---

For an additional rant about text rendering, let me refer you to a blogpost by Aria Desires: ["Text Rendering Hates You"](https://faultlore.com/blah/text-hates-you/).

Since I've already fallen into multiple rabitholes at this point, I'm taking my font rendering engine for granted and constraining myself to simple text, which includes emojis! ✨ (even with colors: yes this was absolutely necessary).

![meme](/images/user_input.jpeg)
</details>