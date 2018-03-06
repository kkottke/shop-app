package de.kkottke.shopapp.repository;

import de.kkottke.shopapp.domain.Wishlist;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Wishlist entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

}
