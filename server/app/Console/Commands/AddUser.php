<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class AddUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:user {email} {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Adds a new user';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        try {
            $newUser = User::createNew(
                $this->argument("name"),
                $this->argument("email")
            );

            $newUser->save();
            $this->comment("User added");
        } catch (\Exception $e) {
            $this->error($e->getMessage());
        }
    }
}
