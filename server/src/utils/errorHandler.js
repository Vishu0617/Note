export function ZodErrorHandler (error){
    const errorResponse = error.errors.filter((err) => err);
    return errorResponse;
}