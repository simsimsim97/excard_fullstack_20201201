function longestCommonPrefix(words) {
    let prefix = ""

    if(words === null || words.length === 0) 
        return prefix

    for (let i=0; i < words[0].length; i++){ 
        const char = words[0][i]; // loop through all characters of the very first string. 

        for (let j = 1; j < words.length; j++){ 
          // loop through all other strings in the array
            if(words[j][i] !== char) 
                return prefix
        }
        prefix = prefix + char
    }
    return prefix
}

console.log("find prefix", longestCommonPrefix(["flower", "flow", "flight"]));