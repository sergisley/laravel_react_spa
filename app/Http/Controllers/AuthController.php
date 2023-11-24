<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{

    public function register(RegisterRequest $request): JsonResponse
    {
        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        return response()->json([
            'user' => new UserResource($user),
        ])->withCookie(
            cookie(
                'token',
                $user->createToken('auth_token')->plainTextToken,
                config('auth.cookie_ttl')//@todo use the sanctum expiration config
            )
        );
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $data = $request->validated();

        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                'message' => 'Email or password is incorrect!'
            ], Response::HTTP_UNAUTHORIZED);
        }

        return response()->json([
            'user' => new UserResource($user),
        ])->withCookie(
            cookie(
                'token',
                $user->createToken('auth_token')->plainTextToken,
                config('auth.cookie_ttl')//@todo use the sanctum expiration config
            )
        );
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully!'
        ])->withCookie(
            cookie()->forget('token')
        );
    }


    public function user(Request $request): UserResource
    {
        return new UserResource($request->user());
    }

}
