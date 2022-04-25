<?php

namespace App\Http\Middleware;

use App\Models\Token;
use Closure;
use Illuminate\Http\Request;

class AuthenticateAPI
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        $token = $request->header('authorization');
        $method = $request->route()->getActionMethod();
        $Controller = $request->route()->controller;

        if (isset($Controller->authIgnore)
            && is_array($Controller->authIgnore)
            && in_array($method, $Controller->authIgnore)
        ) {

            return $next($request);
        }

        if ($token) {
            $token = str_replace("Bearer ", "", $token);

            if (!empty($token)) {
                $tokenId = Token::where([
                    ['token', $token]
                ])->value('id');
                if ($tokenId) {
                    $request->attributes->add(['tokenId' => $tokenId]);
                    return $next($request);
                }
            }

            return response()
                ->json(['status' => 'UNAUTHORIZED'], 401);
        }

        return response()
            ->json(['status' => 'UNAUTHORIZED'], 401);
    }
}
