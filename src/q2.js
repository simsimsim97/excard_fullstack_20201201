function validateTransaction(notesReceived) {
    var notesInHand = [];

    for (i = 0; i < notesReceived.length; i++) {
        notesInHand.push(notesReceived[i]);

        // validate when notes received is not 5 dollars
        if (notesReceived[i] !== 5) {
            var notesToChange = notesReceived[i] - 5;

            // assume that i have to give customer 5 dollars change (customer pay 10 dollars)
            if (notesToChange == 5) { 
                var changeable = notesInHand.indexOf(notesToChange) > -1;

                if (changeable) {
                    var note5Dollar = notesInHand.indexOf(5);
                    notesInHand.splice(note5Dollar, 1);
                } else {
                    return false;
                }
            } else if (notesToChange == 15) { //assume that i should give back 15 dollars change (customer pay 20 dollars)
                var numberOfNotes5 = 0;
                var numberOfNotes10 = 0;

                // calculate different of notes i have in hand
                for (j = 0; j < notesInHand.length; j++) {
                    if (notesInHand[j] == 5) {
                        numberOfNotes5 = numberOfNotes5 + 1;
                    } else if (notesInHand[j] == 10) {
                        numberOfNotes10 = numberOfNotes10 + 1;
                    }
                }

                if (numberOfNotes10 >= 1 && numberOfNotes5 >= 1) {
                    var note10Dollar = notesInHand.indexOf(10);
                    notesInHand.splice(note10Dollar, 1);

                    var note5Dollar = notesInHand.indexOf(5);
                    notesInHand.splice(note5Dollar, 1);

                } else if (numberOfNotes5 >= 3) {
                    for (k=0; k<3; k++) {
                        var note5Dollar = notesInHand.indexOf(5);
                        notesInHand.splice(note5Dollar, 1);
                    }
                } else {
                    return false;
                }
            }
        }
    }
    return true;
}

console.log("Validate Transactions", validateTransaction([5, 10, 5, 10, 15, 20]));