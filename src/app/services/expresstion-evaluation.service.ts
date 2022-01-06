const safeEval = require('safe-eval');

export class ExpressEvaluation {
    evaluate(expression, context){
        return safeEval(expression, context);
    }

}
