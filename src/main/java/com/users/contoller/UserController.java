package com.users.contoller;

import com.users.model.User;
import com.users.service.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepository repository;


    @PostMapping("/addUser")
    public String saveUser(@RequestBody User user) {
        repository.save(user);
        return "Added user with id : " + user.getId();
    }

    @GetMapping("/findAllUsers")
    public List<User> getUsers() {
        return repository.findAll();
    }

    @GetMapping("/findAllUsers/{id}")
    public Optional<User> getUser(@PathVariable ObjectId id) {
        return repository.findById(id);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable ObjectId id) {
        repository.deleteById(id);
        return "user deleted with id : " + id;
    }

    @PutMapping("/updateUser/{id}")
    public ResponseEntity<User> updateUser(@PathVariable(value = "id") ObjectId id, @Valid @RequestBody User userDetails) {
        User user = repository.findById(id).get();
        if(user == null) {
            return ResponseEntity.notFound().build();
        }
        user.setName(userDetails.getName());
        user.setLastname(userDetails.getLastname());
        user.setPhone(userDetails.getPhone());
        User updatedUser = repository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

}
