package com.users.service;

import com.users.model.User;
import com.users.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService {

    @Autowired
    private UsersRepository userRepo;

    public List<User> userListAll (){
        return userRepo.findAll();
    }
    public void save (User user) {
        userRepo.save(user);
    }
    public User get(Long id){
        return userRepo.findById(id).get();
    }
    public void delete (Long id) {
        userRepo.deleteById(id);
    }



}
