<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiUserTest extends TestCase
{
    use DatabaseMigrations;
    use RefreshDatabase;

    public function test_user_registration_empty(): void
    {
        $this->postJson('/api/register', [])
            ->assertStatus(422)
            ->assertJsonStructure([
                'message',
                'errors',
            ]);
    }

    public function test_user_registration_invalid_email(): void
    {
        $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'john',
            'password' => 'password',
            'password_confirmation' => 'password',
        ])->assertStatus(422)
            ->assertJsonStructure([
                'message',
                'errors',
            ]);
    }

    public function test_user_registration_invalid_password(): void
    {
        $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'john@teste.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ])->assertStatus(422)
            ->assertJsonStructure([
                'message',
                'errors',
            ]);

    }

    public function test_user_registration_succes(): void
    {
        $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'john@teste.com',
            'password' => 'Aa123456!',
            'password_confirmation' => 'Aa123456!',
        ])->assertStatus(200)
            ->assertJsonStructure([
                'user' => [
                    'id',
                    'name',
                    'email',
                    'created_at',
                    'updated_at',
                ],
            ]);
    }

    public function test_user_registration_repeated_email(): void
    {
        $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'john@teste.com',
            'password' => 'Aa123456!',
            'password_confirmation' => 'Aa123456!',
        ])->assertStatus(200)
            ->assertJsonStructure([
                'user' => [
                    'id',
                    'name',
                    'email',
                    'created_at',
                    'updated_at',
                ],
            ]);

        $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'john@teste.com',
            'password' => 'Aa123456!',
            'password_confirmation' => 'Aa123456!',
        ])->assertStatus(422)
            ->assertJsonStructure([
                'message',
                'errors',
            ]);
    }

    public function test_user_login_empty(): void
    {
        $this->postJson('/api/login', [])
            ->assertStatus(422)
            ->assertJsonStructure([
                'message',
                'errors',
            ]);
    }

    public function test_user_login_invalid_email(): void
    {
        $this->postJson('/api/login', [
            'email' => 'john',
            'password' => 'password',
        ])->assertStatus(422)
            ->assertJsonStructure([
                'message',
                'errors' => [
                    'email',
                ]
            ]);
    }

    public function test_user_login_invalid_password(): void
    {
        $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'john@teste.com',
            'password' => 'Aa123456!',
            'password_confirmation' => 'Aa123456!',
        ])->assertStatus(200)
            ->assertJsonStructure([
                'user' => [
                    'id',
                    'name',
                    'email',
                    'created_at',
                    'updated_at',
                ],
            ]);

        $this->postJson('/api/login', [
            'email' => 'john@teste.com',
            'password' => 'Aa123457!',
        ])->assertStatus(401);

//        $response->assertJsonStructure([
//            "message" => "Email or password is incorrect!",
//            ]); //@todo fix this
    }

    public function test_user_login_succes(): void
    {
        $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'john@teste.com',
            'password' => 'Aa123456!',
            'password_confirmation' => 'Aa123456!',
        ])->assertStatus(200)
            ->assertJsonStructure([
                'user' => [
                    'id',
                    'name',
                    'email',
                    'created_at',
                    'updated_at',
                ],
            ]);

        $this->postJson('/api/login', [
            'email' => 'john@teste.com',
            'password' => 'Aa123456!',
        ])->assertStatus(200)
            ->assertJsonStructure([
                'user' => [
                    'id',
                    'name',
                    'email',
                    'created_at',
                    'updated_at',
                ],
            ])->assertCookie('token');

    }


    public function test_user_get_user_succes(): void
    {
        $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'john@teste.com',
            'password' => 'Aa123456!',
            'password_confirmation' => 'Aa123456!',
        ])->assertStatus(200)
            ->assertJsonStructure([
                'user' => [
                    'id',
                    'name',
                    'email',
                    'created_at',
                    'updated_at',
                ],
            ]);

        $loginResponse = $this->postJson('/api/login', [
            'email' => 'john@teste.com',
            'password' => 'Aa123456!',
        ])->assertStatus(200)
            ->assertJsonStructure([
                'user' => [
                    'id',
                    'name',
                    'email',
                    'created_at',
                    'updated_at',
                ],
            ])
            ->assertCookie('token');

        $loginResponse = $this->withCredentials()
            ->withUnencryptedCookie('token', $loginResponse->headers->getCookies()[0]->getValue())
            ->getJson('/api/user')
            >assertStatus(200)
                ->assertJsonStructure([
                'user' => [
                    'id',
                    'name',
                    'email',
                    'created_at',
                    'updated_at',
                ],
            ]);

    }

    public function test_user_logout_succes(): void
    {
        $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'john@teste.com',
            'password' => 'Aa123456!',
            'password_confirmation' => 'Aa123456!',
        ])->assertStatus(200)
            ->assertJsonStructure([
                'user' => [
                    'id',
                    'name',
                    'email',
                    'created_at',
                    'updated_at',
                ],
            ]);

        $loginResponse = $this->postJson('/api/login', [
            'email' => 'john@teste.com',
            'password' => 'Aa123456!',
        ])->assertStatus(200)
            ->assertJsonStructure([
                'user' => [
                    'id',
                    'name',
                    'email',
                    'created_at',
                    'updated_at',
                ],
            ])
            ->assertCookie('token');

        $loginCookie = $loginResponse->headers->getCookies()[0]->getValue();

        $logoutResponse = $this->withCredentials()
            ->withUnencryptedCookie('token', $loginCookie)
            ->postJson('/api/logout', [])
            ->dump()
            ->assertStatus(200)
            ->assertContent('{"message":"Logged out successfully!"}');

        $this->assertEquals('', $logoutResponse->headers->getCookies()[0]->getValue());

        $loginResponse = $this->withCredentials()
            ->withUnencryptedCookie('token', $loginCookie)
            ->getJson('/api/user')
            ->assertStatus(401);
    }


}
