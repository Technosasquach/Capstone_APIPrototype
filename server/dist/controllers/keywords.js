"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReText = require("retext");
const ReTextKeyWords = require("retext-keywords");
const ReTextPos = require("retext-pos");
/**
 * KeyWordEngine
 *
 * @export
 * @class KeyWordEngine
 */
class KeyWordEngine {
    /**
     * processForKeyWords
     * Wraps the keyword processing engine provided retext-keywords
     *
     * @static
     * @param {string} text - Given text to extract keywords out of
     * @param {Function} done - Function that is called after the keywords have been processes out of the given text
     * @memberof KeyWordEngine
     */
    static processForKeyWords(text, done) {
        for (let i = 0; i < text.length; i++) {
            ReText()
                .use(ReTextPos)
                .use(ReTextKeyWords)
                .process(text, done);
        }
    }
}
exports.KeyWordEngine = KeyWordEngine;
//# sourceMappingURL=keywords.js.map