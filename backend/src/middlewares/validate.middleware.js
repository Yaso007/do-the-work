export const validate = (schema) => (req, res, next) =>{
    try {
        const parsed = schema.parse(req.body||{});

        req.body = parsed;

        next();
    }catch (error){
        const errorDetails = error.issues || error.errors ||[];
        return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: errorDetails.map((err) => ({
                field:err.path.join('.'),
                message:err.message,
            })),
        });
    }
}